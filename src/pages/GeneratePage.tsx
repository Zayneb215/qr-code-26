import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import { ArrowUpRightIcon, Download } from "lucide-react";
import { use, useEffect, useRef, useState } from "react";
import QRCode from "react-qr-code";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import type { User } from "@/hooks/use-users";
import useUsers from "@/hooks/use-users";

function GenerateQR() {
	const [users, setUsers] = useState<User[]>([]);
	const [email, setEmail] = useState("");
	const [qrText, setQrText] = useState("");
	const { fetchUsers } = useUsers();
	const [error, setError] = useState<string | null>(null);
	const [foundUser, setfoundUser] = useState<User | null>(null);
	const qrRef = useRef<HTMLDivElement>(null);
	async function loadUsers() {
		const loadedUsers = await fetchUsers();
		setUsers(loadedUsers);
	}
	useEffect(() => {
		loadUsers();
	}, []);

	function handleGenerateQrCode() {
		const foundUser = users.filter((user) => user.email === email)[0];
		if (foundUser) {
			const foundUserToString = JSON.stringify(foundUser);
			setQrText(foundUserToString);
			setfoundUser(foundUser);
		} else {
			setError("User not found");
			setTimeout(() => {
				setError(null);
			}, 5000);
		}
	}
	function handleInput(value: string) {
		qrText && setQrText("");
		setEmail(value);
	}
	async function handleDownloadPdf() {
		if (!foundUser || !qrRef.current) return;
		// Transforme le QR code en image
		const canvas = await html2canvas(qrRef.current);
		const imgData = canvas.toDataURL("image/png");

		const pdf = new jsPDF();

		// Ajouter texte utilisateur
		pdf.setFontSize(16);
		pdf.text(`Name: ${foundUser.name}`, 20, 20);
		pdf.text(`Email: ${foundUser.email}`, 20, 30);
		pdf.text(`Matriculation Number: ${foundUser.matriculation_number}`, 20, 40);
		pdf.text(`Phone Number: ${foundUser.phone_number}`, 20, 50);
		pdf.text(`Age: ${foundUser.age}`, 20, 60);
		pdf.text(`Married: ${foundUser.married ? "Yes" : "No"}`, 20, 70);

		// Ajouter QR code
		pdf.addImage(imgData, "PNG", 20, 80, 100, 100);

		// Télécharger le PDF
		pdf.save(`${foundUser.name}_QR.pdf`);
	}

	return (
		<>
			<h1 className="text-5xl font-bold text-center ">Generate</h1>

			<div className="flex flex-col items-center w-md mx-auto bg-white rounded-xl p-10  shadow-md">
				<div className="flex flex-col gap-4 w-3/4">
					<Input
						type="text"
						placeholder="Entrez un email"
						value={email}
						//onChange={(e) => setEmail(e.target.value)}
						onChange={(e) => handleInput(e.target.value)}
					/>
					<div className="flex gap-2">
						<Button className="flex-1" onClick={handleGenerateQrCode}>
							Generate
						</Button>
						{foundUser && (
							<Button
								onClick={handleDownloadPdf}
								size="icon"
								aria-label="Submit"
								variant="outline"
							>
								<Download />
							</Button>
						)}
					</div>
					{error && <Badge variant="destructive">{error}</Badge>}
					{qrText && (
						<div
							ref={qrRef}
							style={{
								backgroundColor: "#fff",
								color: "#000",
								padding: "20px",
							}}
						>
							<QRCode className="w-full" value={JSON.stringify(qrText)} />
						</div>
					)}
				</div>
			</div>
		</>
	);
}

export default GenerateQR;
