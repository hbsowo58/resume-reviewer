import * as pdfjsLib from 'pdfjs-dist';
pdfjsLib.GlobalWorkerOptions.workerSrc = '/pdf.worker.min.mjs';
export async function extractFirstThreeLines(file) {
    const arrayBuffer = await file.arrayBuffer();
    const uint8Array = new Uint8Array(arrayBuffer);
    const pdf = await pdfjsLib.getDocument({ data: uint8Array }).promise;
    const firstPage = await pdf.getPage(1);
    const textContent = await firstPage.getTextContent();
    const lines = textContent.items
        .filter((item) => 'str' in item)
        .map((item) => item.str)
        .join('')
        .split('\n')
        .filter((line) => line.trim());
    return lines.slice(0, 3).join('\n');
}
//# sourceMappingURL=pdfParser.js.map