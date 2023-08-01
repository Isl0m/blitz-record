import { writable } from 'svelte/store';

const availableMimeTypes = ['video/mp4', 'video/webm'];
let recordedChunks: Blob[] = [];
let mediaRecorder: MediaRecorder | undefined;
let mimeType = '';

export let time = writable(0);
export let videoUrl = writable('');

export function getMimeTypes() {
	return availableMimeTypes.filter((mime) => MediaRecorder.isTypeSupported(mime));
}

async function getScreenAccess(options?: DisplayMediaStreamOptions) {
	try {
		const stream = await navigator.mediaDevices.getDisplayMedia(options);
		return stream;
	} catch (error) {
		alert('Please grant screen recording permission and try again.');
	}
}

export async function startRecord(selectedMimeType: string) {
	mimeType = selectedMimeType;
	const stream = await getScreenAccess({ audio: true, video: true });
	if (stream) {
		mediaRecorder = new MediaRecorder(stream, { mimeType });

		mediaRecorder.start(1000);

		setListeners();
	}
}

export function pauseRecord() {
	mediaRecorder?.pause();
}

export function stopRecord() {
	mediaRecorder?.stop();
}

export function downloadRecord() {
	const link = document.createElement('a');
	let url = '';
	videoUrl.subscribe((value) => {
		url = value;
	});
	link.href = url;
	link.download =
		Intl.DateTimeFormat('en', {
			year: 'numeric',
			month: '2-digit',
			day: '2-digit',
			hour: '2-digit',
			minute: '2-digit'
		}).format(new Date()) + mimeType.split('/')[1];
	link.click();
	window.URL.revokeObjectURL(url);
	recordedChunks = [];
	time.set(0);
}

function setListeners() {
	if (mediaRecorder) {
		mediaRecorder.ondataavailable = handleDataAvailable;
		mediaRecorder.onstop = handleOnStop;
	}
}

function handleDataAvailable(event: BlobEvent) {
	time.update((t) => t + 1);

	if (event.data.size > 0) {
		recordedChunks.push(event.data);
	}
}

function handleOnStop() {
	if (mediaRecorder) {
		mediaRecorder.ondataavailable = null;
		mediaRecorder.onstop = null;
	}

	mediaRecorder = undefined;

	createUrl();
}

function createUrl() {
	const blob = new Blob(recordedChunks, {
		type: mimeType
	});
	videoUrl.set(URL.createObjectURL(blob));
}
