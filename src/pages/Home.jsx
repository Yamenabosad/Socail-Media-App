import { useSelector } from "react-redux";

import CardComponent from "../component/CardComponent";

function Home() {
  const { posts } = useSelector((state) => state.post);
  return (
    <div className="container mx-auto p-4 md:p-6 lg:p-8">
      <CardComponent data={posts} />
    </div>
  );
}

export default Home;
