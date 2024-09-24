export interface Profile {
    id: number;
    bio: string;
    profileImageUrl: string;
    userId: number;
    user: UserType;
}

export interface UserType {
    username: string;
    id: number;
    name: string;
    email: string;
    password: string;
    posts: PostType[];
    profile: Profile;
}

export interface PostType {
    id: number;
    content: string;
    createdAt: string;
    authorId: number;
    author: UserType;
}

export interface Profile {
    id: number;
    bio: string;
    profileImageUrl: string;
    userId: number;
    user: UserType;
}