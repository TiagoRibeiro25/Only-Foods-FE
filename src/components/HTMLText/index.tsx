// Regular expression to identify links in the paragraph and capture the link text and URL
const linkRegex = /(?:(?:https?|ftp):\/\/|www\.)[^\s/$.?#].[^\s]*/gi;

const HTMLText = ({ text }: { text: string }) => {
	const paragraphs = text.split('\n'); // Split content into paragraphs

	const renderParagraphWithLinks = (paragraph: string): React.JSX.Element => {
		const matches = paragraph.match(linkRegex);

		// if the link doesn't have http or https, add http to it
		// if it has www replace it with http
		const newMatches = matches?.map(match => {
			if (match.startsWith('www')) {
				return `http://${match}`;
			} else {
				return match;
			}
		});

		// If there are links in the paragraph, replace them with anchor tags
		if (newMatches && newMatches.length > 0) {
			return (
				<p key={crypto.randomUUID()} className="text-md">
					{paragraph.split(linkRegex).map((part, index) => {
						if (index % 2 === 0) {
							return part; // Non-link text
						} else {
							// Link text and URL
							return (
								<a
									key={crypto.randomUUID()}
									href={newMatches[index - 1]}
									target="_blank"
									rel="noopener noreferrer"
									className="text-blue-500 hover:underline"
								>
									{newMatches[index - 1].replace(/(^\w+:|^)\/\//, '')}
								</a>
							);
						}
					})}
				</p>
			);
		} else {
			// If there are no links in the paragraph, return the paragraph as it is
			return (
				<p key={crypto.randomUUID()} className="text-md">
					{paragraph}
				</p>
			);
		}
	};

	return paragraphs.map(paragraph => {
		if (paragraph.trim() === '') {
			return <br key={crypto.randomUUID()} />;
		} else {
			return renderParagraphWithLinks(paragraph);
		}
	});
};

export default HTMLText;