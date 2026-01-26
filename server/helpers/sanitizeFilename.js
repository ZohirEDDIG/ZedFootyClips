export default function sanitizeFilename(name) {
	return name.replace(/[^a-zA-Z0-9]/g, '-');
}