import { writable } from 'svelte/store';

let recordedChunks: Blob[] = [];
let mediaRecorder: MediaRecorder | undefined;
let mimeType = '';

export let time = writable(0);
export let videoUrl = writable('');
export let isReady = writable(false);

export function getMimeTypes() {
	const availableMimeTypes = ['video/mp4', 'video/webm'];
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

export const recorder = {
	start() {
		if (mediaRecorder?.state === 'inactive') {
			mediaRecorder?.start(1000);
		}
	},
	pause() {
		if (mediaRecorder?.state === 'recording') {
			mediaRecorder?.pause();
		} else if (mediaRecorder?.state === 'paused') {
			mediaRecorder?.resume();
		}
	},
	stop() {
		mediaRecorder?.stop();
	},
	reset(url: string) {
		window.URL.revokeObjectURL(url);
		removeListeners();

		mediaRecorder = undefined;
		isReady.set(false);
		recordedChunks = [];
		time.set(0);
		videoUrl.set('');
	},
	async prepare(selectedMimeType: string, options?: DisplayMediaStreamOptions) {
		mimeType = selectedMimeType;
		const stream = await getScreenAccess(options);
		if (stream) {
			mediaRecorder = new MediaRecorder(stream, { mimeType });

			isReady.set(true);
			setListeners();

			return true;
		} else {
			return false;
		}
	},
	getFileName() {
		const date = new Date();
		const ymd = Intl.DateTimeFormat('us', {
			year: 'numeric',
			month: '2-digit',
			day: '2-digit'
		}).format(date);
		const hm = Intl.DateTimeFormat('us', {
			hour: '2-digit',
			minute: '2-digit',
			hour12: false
		}).format(date);
		return `${ymd}/${hm}`;
	}
};

function setListeners() {
	if (mediaRecorder) {
		mediaRecorder.ondataavailable = handleDataAvailable;
		mediaRecorder.onstop = handleOnStop;
	}
}

function removeListeners() {
	if (mediaRecorder) {
		mediaRecorder.ondataavailable = null;
		mediaRecorder.onstop = null;
	}
}

function handleDataAvailable(event: BlobEvent) {
	time.update((t) => t + 1);

	if (event.data.size > 0) {
		recordedChunks.push(event.data);
	}
}

function handleOnStop() {
	removeListeners();
	createUrl();
}

function createUrl() {
	const blob = new Blob(recordedChunks, {
		type: mimeType
	});
	videoUrl.set(URL.createObjectURL(blob));
}
