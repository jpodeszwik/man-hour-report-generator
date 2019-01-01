import { generateDocument } from './pdf-generator';
import { buildDocumentDefinition } from './document-definition-builder';

exports.handler = async event => {
	if (event.body === null && event.body === undefined) {
		return {
			statusCode: 400,
			body: JSON.stringify('Request without body!'),
		};
	}

	const body = JSON.parse(event.body);
	const documentDefinition = buildDocumentDefinition(body);
	const pdf = await generateDocument(documentDefinition);

	return {
		isBase64Encoded: true,
		statusCode: 200,
		headers: { "content-type": "application/pdf" },
		body: pdf,
	};
};
