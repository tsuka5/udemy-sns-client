import apiClient from '@/src/components/lib/apiClient';
import { GetServerSideProps, GetServerSidePropsContext } from 'next';
import React from 'react'
import { PostType, Profile } from '@/styles/types';
import EditableContent from '@/src/components/EditableContent';

type Props = {
  profile: Profile;
  posts: PostType[];
}


export const getServerSideProps: GetServerSideProps = async (context: GetServerSidePropsContext) => {
  const { userId } = context.query;
  try {
    const profileResponse = await apiClient.get(`/users/profile/${userId}`);
    const postsResponse = await apiClient.get(`/posts/${userId}`);
    return {
      props: {
        profile: profileResponse.data.profile,
        posts: postsResponse.data
      }
    }
  }catch(err) {
    console.log("Error fetching profile:", err);
    return {
      notFound: true,
    }
  }
}



const UserProfile = ({profile, posts}: Props) => {

  const handleDelete = async (postId: number) =>{
    try {
      const response = await apiClient.delete(`/users/profile/${profile.user.id}/${postId}`);
      if(response.status === 200) {
        window.location.reload();
      }
    }catch (err) {
      console.log("Error deleting post:", err);
    }

  

  }
  
  const handleEdit = async (postId: number, newContent: string) => {
    try {
      const response = await apiClient.put(`/users/profile/${profile.user.id}/${postId}`, {
        content: newContent
      });
      if(response.status === 200) {
        alert("投稿を編集しました");
      }
    }catch(err) {
      console.log("Error editing post:", err);
      alert("投稿の編集に失敗しました");
    }
  };


  return (
    <div className="container mx-auto px-4 py-8">
  <div className="w-full max-w-xl mx-auto">
    <div className="bg-white shadow-md rounded-lg p-6 mb-4">
      <div className="flex items-center">
        <img className="w-20 h-20 rounded-full mr-4" alt="User Avatar" src={profile.profileImageUrl} />
        <div>
          <h2 className="text-2xl font-semibold mb-1">{profile.user.username}</h2>
          <p className="text-gray-600">{profile.bio}</p>
        </div>
      </div>
    </div>
    {posts.map((post: PostType) => (
    <div className="bg-white shadow-md rounded p-4 mb-4" key={post.id}>
      <div className="mb-4">
        <div className="flex items-center mb-2">
          <img className="w-10 h-10 rounded-full mr-2" alt="User Avatar" src={profile.profileImageUrl} />
          <div>
            <h2 className="font-semibold text-md">{post.author.username}</h2>
            <p className="text-gray-500 text-sm">{new Date(post.createdAt).toLocaleDateString()}</p>
          </div>
        </div>
        <EditableContent post={post} onSave={(newContent) => handleEdit(post.id, newContent)} />
      </div>
      <button onClick={() => handleDelete(post.id)} className="bg-red-500 text-white px-4 py-2 rounded">削除</button>

    </div>
      
    ))}
  </div>
</div>
  )
}

export default UserProfile