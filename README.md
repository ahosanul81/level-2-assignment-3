# level-2-assignment-3

## Api endpoints
## 1. Authentication
## 1.1 Register User
    POST https://assignment-3-six-kappa.vercel.app/api/auth/register

## 1.2 Login User
    POST https://assignment-3-six-kappa.vercel.app/api/auth/login

### 2. Blog Management
## 2.1 Create Blog
    POST https://assignment-3-six-kappa.vercel.app/api/blogs
## 2.2 Update Blog
    PATCH https://assignment-3-six-kappa.vercel.app/api/blogs/:id
## 2.3 Delete Blog
    DELETE https://assignment-3-six-kappa.vercel.app/api/blogs/:id
    
## 2.4 Get All Blogs (Public)
    GET https://assignment-3-six-kappa.vercel.app/api/blogs?search=excercise&sortBy=createdAt&sortOrder=desc&filter=67659766e490029cbe08dd64

    
## 3. Admin Actions
## 3.1 Block User
    PATCH https://assignment-3-six-kappa.vercel.app/api/admin/users/:userId
## 3.2 Delete Blog
    DELETE https://assignment-3-six-kappa.vercel.app/api/admin/blogs/:id
