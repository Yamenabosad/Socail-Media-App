import ContentLoader from "react-content-loader";

const CommentLoader = (props) => (
  <ContentLoader 
    speed={2}
    width={400}
    height={50}
    viewBox="0 0 400 50"
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb"
    {...props}
  >
    <rect x="65" y="14" rx="5" ry="5" width="220" height="10" /> 
    <rect x="65" y="38" rx="5" ry="5" width="175" height="10" /> 
    <rect x="8" y="12" rx="0" ry="0" width="44" height="38" />
  </ContentLoader>
);

export default CommentLoader;
