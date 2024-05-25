// src/App.js
import React, {useState, useEffect} from 'react';
import axios from 'axios';
import Post from './components/Post';

const App = () => {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    const fetchPosts = async (page) => {
        try {
            const response = await axios.get(`https://pilearn.ir/wp-json/wp/v2/posts?_embed`, {
                params: {
                    page: page,
                    per_page: 10, // Adjust per page limit as needed
                },
            });
            setPosts(response.data);
            setTotalPages(parseInt(response.headers['x-wp-totalpages']));
            setLoading(false);
        } catch (error) {
            console.error('Error fetching posts:', error);
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchPosts(currentPage);
    }, [currentPage]);

    const handleNextPage = () => {
        if (currentPage < totalPages) {
            setCurrentPage(currentPage + 1);
        }
    };

    const handlePreviousPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    if (loading) {
        return <p>Loading posts...</p>;
    }
    return (
        <>
            <div className="font-vazir max-w-[900px] container mx-auto p-4">
                <h1 className="text-4xl font-bold text-center my-4">ریلاگ</h1>
                <div className="grid grid-cols-1 gap-4">
                    {posts.map((post) => (
                        <Post key={post.id} post={post}/>
                    ))}
                </div>
            </div>
            <div>
                <button onClick={handlePreviousPage} disabled={currentPage === 1}>
                    Previous
                </button>
                <span>Page {currentPage} of {totalPages}</span>
                <button onClick={handleNextPage} disabled={currentPage === totalPages}>
                    Next
                </button>
            </div>
        </>
    );
};

export default App;
