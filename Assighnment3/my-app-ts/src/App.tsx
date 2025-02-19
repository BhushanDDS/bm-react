import { useEffect, useState } from 'react'
import './App.css'
import './index.css'
import axios from 'axios'
import SubmitPost from './component/SubmitPost';
import TopPost from './component/TopPosts';


function App() {
interface IpostStructure{
  userId: number;
  title: string;
  body: string;
  id?: number;
}

const [postId, setpostId] = useState<string>("")
const [posts, setposts] = useState<IpostStructure[] | IpostStructure| null>([])
const [topposts, settopposts] = useState<IpostStructure[] | IpostStructure| null>([])
const [loading, setLoading] = useState<boolean>(false);
const [error, setError] = useState<string | null>(null);


useEffect(function(){
  const fetchResponse = async () => {
    try {
      const res = await axios.get('https://jsonplaceholder.typicode.com/posts?_limit=5');
      settopposts(res.data);
    } catch (error) {
      console.error('error', error);
      setError('Failed to fetch ');
    }
  };
  fetchResponse();
},[])


const postHandler= async ()=>{

  if (!postId) return;
  setLoading(true);
  setposts(null);
  setError(null);

  try {
    const res = await axios.get(
      `https://jsonplaceholder.typicode.com/posts/${postId}` );
    if (res.status!==200) {
      throw new Error("Post not found");
    }
    setposts(res.data);
  } catch (error) {
    setError((error as Error).message);
  } finally {
    setLoading(false);
  }
}
return (
  <>

  <div className='flex flex-col items-center justify-center text-center'>


    <h3 className="text-xl font-semibold mb-4 text-center bg-pink-400">Top 5 Posts</h3>
    {Array.isArray(topposts) &&
      topposts.map((val) => (
        <TopPost key={val.id} title={val.title} body={val.body} id={val.id} />
      ))}

  </div>

    <div className="mt-6 p-4 bg-gray-100 rounded-lg shadow-md">
      <h3 className="text-lg font-semibold mb-2">Get By Id</h3>
      <div className="flex gap-2">
        <input 
          type="text"
          value={postId}
          onChange={(e) => setpostId(e.target.value)}
          placeholder="Enter Post ID"
          className="flex-grow p-2 border rounded-md focus:ring-2 focus:ring-blue-400"
        />
        <button 
          onClick={postHandler}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
        >
          Get Post By Id
        </button>
      </div>
    </div>

    {loading && <p className="text-gray-500 mt-2">Loading...</p>}
    {error && <p className="text-red-500 mt-2">{error}</p>}

    {posts && !Array.isArray(posts) && (
      <div className="p-4 bg-white rounded-lg shadow-md mt-4">
        <h4 className="text-lg font-semibold">Post Details:</h4>
        <p><strong>Title:</strong> {posts.title}</p>
        <p><strong>Body:</strong> {posts.body}</p>
      </div>
    )}

    <SubmitPost />
  </>
)

}

export default App
