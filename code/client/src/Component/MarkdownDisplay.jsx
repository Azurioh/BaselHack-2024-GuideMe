import { Button, Flex, message } from 'antd';
import ReactMarkdown from 'react-markdown';
import { FiCopy } from 'react-icons/fi';
import { FaFilePdf, FaFileWord } from 'react-icons/fa';


const MarkdownDisplay = ({ text }) => {
    function handleCopy() {
        navigator.clipboard.writeText(text);
        message.success('Copied to clipboard');
    }

    function handleDownloadPDF() {
        // TODO: call the server to get the pdf
        console.log('Download PDF');
    }

    function handleDownloadDOCX() {
        // TODO: call the server to get the docx
        console.log('Download DOCX');
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