import { HeartFilled, HeartOutlined, LeftOutlined, RightOutlined, SaveFilled, SaveOutlined } from "@ant-design/icons";
import { Button, Carousel, Modal, Tag, Typography } from "antd";
import Title from "antd/es/typography/Title";
import { useState } from "react";
import MarkdownDisplay from "./MarkdownDisplay";
import { useTranslation } from 'react-i18next';

const { Text, Paragraph } = Typography;

function GuideDetail(props) {
    const [isLiked, setIsLiked] = useState(false);
    const [isSaved, setIsSaved] = useState(false);
    const {t} = useTranslation();

    const handleLike = () => {
        setIsLiked(!isLiked);
        // TODO: call the api to like
    };

    const handleSave = () => {
        setIsSaved(!isSaved);
        // TODO: call the api to save
    };

    return (
        <Modal
            title={<Title level={2} className="text-center">{props.guide?.result?.title}</Title>}
            open={props.visible}
            onCancel={props.onClose}
            footer={null}
            centered
            style={{ marginTop: '10px' }}
        >
            <div style={{ textAlign: 'center', marginBottom: '10px' }}>
                <Text strong>{t("components.guide_details.author")}:</Text> <Text>{props.guide?.author || t("components.guide_details.unknown_author")}</Text>
            </div>

            <div style={{ textAlign: 'center', marginBottom: '10px' }}>
                {props.guide?.tags && props.guide.tags.map((tag, index) => (
                    <Tag color="blue" key={index} style={{ margin: '4px' }}>
                        {tag}
                    </Tag>
                ))}
            </div>

            {props.guide?.imgs && props.guide.imgs.length > 0 && (
                <div style={{textAlign: 'center', alignItems: 'center'}}>
                    <Title level={4}>{t("components.guide_details.images")}</Title>
                    <Carousel autoplay infinite>
                        {props.guide.imgs.map((image, index) => (
                            <div key={index} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '300px', }}>
                                <img
                                    src={`data:image/jpeg;base64,${image}`}
                                    alt={`Image ${index + 1}`}
                                    style={{ width: '100%', maxHeight: '300px', objectFit: 'contain' }}
                                />
                            </div>
                        ))}
                    </Carousel>
                </div>
            )}

            <div style={{ display: 'flex', justifyContent: 'center', gap: '16px', marginTop: '20px' }}>
                <Button
                    type="primary"
                    icon={isLiked ? <HeartFilled /> : <HeartOutlined />}
                    onClick={handleLike}
                    style={{ backgroundColor: isLiked ? '#ff4d4f' : '#1890ff', borderColor: isLiked ? '#ff4d4f' : '#1890ff' }}
                >
                    {isLiked ? "Liked" : "Like"}
                </Button>
                <Button
                    type="default"
                    icon={isSaved ? <SaveFilled /> : <SaveOutlined />}
                    onClick={handleSave}
                    style={{ backgroundColor: isSaved ? '#52c41a' : 'white', borderColor: isSaved ? '#52c41a' : '#d9d9d9' }}
                >
                    {isSaved ? "Saved" : "Save"}
                </Button>
            </div>

            <div style={{ marginTop: '24px', textAlign: 'center' }}>
                <Title level={4}>{t("components.guide_details.description")}</Title>
                <MarkdownDisplay text={props.guide?.result.content} title={props.guide?.title}/>
            </div>
        </Modal>
    )
}

export default GuideDetail;