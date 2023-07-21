import RootLayout from "@/components/Layouts/RootLayout";
import {
  CalendarOutlined,
  CommentOutlined,
  ProfileOutlined,
} from "@ant-design/icons";
import { Col, Row } from "antd";
import Image from "next/image";
const NewsDetailsPage = ({ news }) => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <Row gutter={16}>
        <Col span={12}>
          <div>
            <Image
              src={news?.image_url}
              width={500}
              height={300}
              responsive
              alt="image-news"
            />
          </div>
        </Col>
        <Col span={12}>
          <div>
            <h1 style={{ fontSize: "50px" }}>{news?.title}</h1>
            <div
              className="line"
              style={{
                height: "5px",
                margin: "20px 0",
                background: "#000",
                width: "95%",
              }}
            ></div>

            <p
              style={{
                display: "flex",
                justifyContent: "space-between",
                width: "90%",
                color: "gray",
                margin: "10px 0px",
              }}
            >
              <span>
                <CalendarOutlined /> {news?.release_date}
              </span>
              <span>
                <CommentOutlined /> {news?.comment_count} COMMENTS
              </span>
              <span>
                <ProfileOutlined /> {news?.category}
              </span>
            </p>

            <p style={{ fontSize: "20px" }}>{news?.description}</p>
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default NewsDetailsPage;

NewsDetailsPage.getLayout = function getLayout(page) {
  return <RootLayout>{page}</RootLayout>;
};

export const getStaticPaths = async () => {
  const res = await fetch("http://localhost:5000/news");
  const newses = await res.json();

  const paths = newses.map((news) => ({
    params: { newsId: news.id },
  }));

  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps = async (context) => {
  const { params } = context;
  const res = await fetch(`http://localhost:5000/news/${params.newsId}`);
  const data = await res.json();

  return {
    props: {
      news: data,
    },
  };
};
