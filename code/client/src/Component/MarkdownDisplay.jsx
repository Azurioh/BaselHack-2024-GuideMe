import { Button, Flex, message } from 'antd';
import ReactMarkdown from 'react-markdown';
import { FiCopy } from 'react-icons/fi';
import { FaFilePdf, FaFileWord } from 'react-icons/fa';
import axios from 'axios';


const MarkdownDisplay = ({ title, text }) => {
    function handleCopy() {
        navigator.clipboard.writeText(text);
        message.success('Copied to clipboard');
    }


    async function handleDownloadPDF() {
        try {
            const response = await axios.post('/api/guidelines/markdownToPdf', {
                title: title,
                markdownContent: text,
                format: "pdf"
            }, {
                headers: {
                    Authorization: localStorage.getItem('token')
                },
                responseType: 'blob'
            });

            const blob = new Blob([response.data], { type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' });
            const downloadUrl = window.URL.createObjectURL(blob);

            const link = document.createElement('a');
            link.href = downloadUrl;
            link.download = `output.docx`;
            document.body.appendChild(link);
            link.click();
            link.remove();

            window.URL.revokeObjectURL(downloadUrl);
        } catch (error) {
            console.error('Erreur lors du téléchargement du fichier:', error.message);
        }
    }

    async function handleDownloadDOCX() {
        try {
            const response = await axios.post('/api/guidelines/markdownToPdf', {
                title: title,
                markdownContent: text,
                format: "docx"
            }, {
                headers: {
                    Authorization: localStorage.getItem('token')
                },
                responseType: 'blob'
            });

            const blob = new Blob([response.data], { type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' });
            const downloadUrl = window.URL.createObjectURL(blob);

            const link = document.createElement('a');
            link.href = downloadUrl;
            link.download = `output.docx`;
            document.body.appendChild(link);
            link.click();
            link.remove();

            window.URL.revokeObjectURL(downloadUrl);
        } catch (error) {
            console.error('Erreur lors du téléchargement du fichier:', error.message);
        }
    }

    return (
        <div>
            <ReactMarkdown>{text || 'Description not found'}</ReactMarkdown>
            <Flex justify='center' gap={"large"} style={{marginTop: "10px"}}>
                <Button onClick={handleCopy}><FiCopy/> Copy</Button>
                <Button onClick={handleDownloadPDF}><FaFilePdf/> Download PDF</Button>
                <Button onClick={handleDownloadDOCX}><FaFileWord/> Download DOCX</Button>
            </Flex>
        </div>
    );
};

export default MarkdownDisplay;