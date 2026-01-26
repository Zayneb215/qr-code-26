import { useState } from "react";
import QRCode from "react-qr-code";

function GenerateQR() {
	const [text, setText] = useState("");

	return (
		<div style={{ padding: 20 }}>
			<input
				type="text"
				placeholder="Entrez le texte ou le lien"
				value={text}
				onChange={(e) => setText(e.target.value)}
			/>

			{text && (
				<div style={{ marginTop: 20, background: "white", padding: 16 }}>
					<QRCode value={text} size={200} />
				</div>
			)}
		</div>
	);
}

export default GenerateQR;
