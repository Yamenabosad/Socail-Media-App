
import ContentLoader from "react-content-loader";

const PostLoader = (props) => (
  <ContentLoader
    style={{marginBottom:"20px"}}
    speed={2}
    width={1170}
    height={760}
    viewBox="0 0 400 260"
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb"
    {...props}
  >
    <rect x="48" y="8" rx="3" ry="3" width="88" height="6" />
    <rect x="48" y="26" rx="3" ry="3" width="52" height="6" />
    <circle cx="20" cy="20" r="20" />
    <rect x="4" y="49" rx="0" ry="0" width="349" height="297" />
  </ContentLoader>
);

export default PostLoader;
