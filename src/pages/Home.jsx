import { useSelector } from "react-redux";

import CardComponent from "../component/CardComponent";
import PostLoader from "../component/PostLoader";

function Home() {
  const { posts } = useSelector((state) => state.post);
  return (
    <div className="mx-10 mt-3">
      <CardComponent data={posts} />
    </div>
  );
}

export default Home;
