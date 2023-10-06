
import SinglePost from "../components/singlePost/SinglePost";

export default function Single() {

    const single = {
        display:'flex',
    }

  return (
    <div style={single}>
      <SinglePost/>
    </div>
  );
}