import { Layout, Menu } from 'antd';
import { Link } from 'react-router-dom';
import { HomeOutlined, ContainerOutlined, UserOutlined, LogoutOutlined } from '@ant-design/icons';
import { useTranslation } from 'react-i18next';

const { Header } = Layout;

function AppHeader() {
  const {t} = useTranslation();
  return (
    <Header style={{ backgroundColor: '#001529' }}>
      <Menu
        theme="dark"
        mode="horizontal"
        style={{
          display: 'flex',
          width: '100%',
        }}
      >
        <Menu.Item key="home" style={{ marginRight: 'auto' }}>
          <Link to="/"><HomeOutlined style={{ fontSize: "20px" }} /></Link>
        </Menu.Item>

        <Menu.Item key="application" style={{marginRight: "5px"}}>
          <Link to="/application"><ContainerOutlined style={{ fontSize: "20px" }} />{t("components.app_header.guide")}</Link>
        </Menu.Item>
        <Menu.Item key="profile" style={{marginLeft: "5px"}}>
          <Link to="/profile"><UserOutlined style={{ fontSize: "20px" }} />{t("components.app_header.profile")}</Link>
        </Menu.Item>

        <Menu.Item key="logout" style={{ marginLeft: 'auto' }}>
          <Link to="/logout"><LogoutOutlined style={{ fontSize: "20px" }} /></Link>
        </Menu.Item>
      </Menu>
    </Header>
  );
}

export default AppHeader;
