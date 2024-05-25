// src/components/Post.js
import React from 'react';

const Post = ({ post }) => {
    const thumbnailUrl = post._embedded['wp:featuredmedia'][0].source_url;
    return (
        <div className="p-4 border rounded-lg shadow-lg">
            <div><img src={thumbnailUrl}/></div>
            <h2 className="text-2xl font-bold mb-2">{post.title.rendered}</h2>
            <div dangerouslySetInnerHTML={{ __html: post.excerpt.rendered }} />
            <a
                href={post.link}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 hover:underline mt-4 block"
            >
                Read more
            </a>
        </div>
    );
};

export default Post;