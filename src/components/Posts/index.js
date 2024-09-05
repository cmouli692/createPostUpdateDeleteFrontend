import {Component} from "react" ;
import {v4 as uuidv4} from "uuid"
import "./index.css"

class Posts extends Component{

    state = {
        creatingPost  : true,
        post : "" ,
        postsList : [],
        isLoading: false ,
        updatingPost : ""
        // postListForManagingState :[]
    }

    // componentDidMount(){
    //     console.log("component did mount")            // removed component did mount CHECK IT ONCE
    //     this.getPostsData()
    // }

    getPostsData = async() => {
    //    this.setState({isLoading : false})               // did is loading false CHECK IT ONCE
    //    const url = "http://localhost:3001/"

       const url = "https://postupdatedeletebackend.onrender.com"
       const options = {
        method : "GET",
        headers : "application/json",
       }
       const response = await fetch(url,options)

       const fetchedPostsList = await response.json()

       // UPDATED A KEY TO ADD isUpdateClicked and updated it to state to manage updates of list

       // CHECK THIS WHAT IS HAPPENING WHY TOO MANY LISTS ARE ADDING 

       // updatedFetchedPostsList is added with isUpdateClicked key and set default value as false


       const updatedFetchedPostsList = fetchedPostsList.map((eachPost) =>{
        const {post,unique_key} = eachPost 
        console.log(eachPost)

        return ({
            post,
            uniqueKey : unique_key,
            isUpdateClicked : false
        })
    })


    console.log(updatedFetchedPostsList)
    

    //    const fetchedPostsListWithIsUpdateClickKey = fetchedPostsList.map(eachPost => 

    //      ({...eachPost,isUpdateClicked : false})
    // )


    //    console.log(fetchedPostsListWithIsUpdateClickKey)

    //    i think we should not do prevState here because it is adding previous in list too  but we are proceeding with backend right

    //    this.setState((prevState) => ({postListForManagingState : [ ...prevState.postListForManagingState,...fetchedPostsListWithIsUpdateClickKey]}))

       this.setState({postsList : updatedFetchedPostsList})

    //    this.setState({postsList : fetchedPostsList})

       this.setState({isLoading : false})

    }

    onSubmitPostForm  = async (event) => {
        this.setState({isLoading : true,creatingPost: false})
        event.preventDefault()
        

        const {post} = this.state


        const postObject = {
           uniqueKey :  uuidv4(),
           post,
        //    isUpdateClicked : false
        
        }

        console.log(postObject)

        const options = {
            method : "POST",
            headers : {
                "Content-Type": "application/json"
            },
            body : JSON.stringify(postObject)
        }

    //    const url = "http://localhost:3001/"
        const url = "https://postupdatedeletebackend.onrender.com/"

        fetch(url,options)

        this.setState({post : ""})

        // await this.getPostsData()
        this.getPostsData()

        //CHECK THIS IF IT IS NECESSARY OR REMOVE IT 

        // this.setState((prevState )=> ({
        //     postListForManagingState : [...prevState.postListForManagingState,postObject]
        // }))

        // this.setState({isLoading:false})         CHECK IT ONCE 
    


       
      
    }

    onChangePostText = (event) => {
        this.setState({post : event.target.value})
    }

    onClickWantToSeeYourPostsBtn = () =>{
        this.setState({creatingPost : false})
        this.getPostsData()
    }

    createPostContainer = () =>
    <div>

        
        <form onSubmit={this.onSubmitPostForm}>
            
            <label htmlFor="post">Your Post :</label>
            <br/>
            <textarea onChange={this.onChangePostText} className="text-area-for-writing-posts" id = "post" rows="10" cols="50" style={{resize : "none"}} placeholder="Write your blog"></textarea>
            <br/>
            <div className="post-btn-and-want-to-see-your-posts-btn-container">
                <button className="post-btn" type="submit">Post</button>
                <button className="want-to-see-your-posts-btn" onClick={this.onClickWantToSeeYourPostsBtn}>WANT TO SEE YOUR POSTS</button>
                
            </div>
            
            
        </form>
    </div>


    onClickCreateNewPost = () =>{
        this.setState({creatingPost : true})

    }

    //  onClickDeleteBtn  = (key) => {
    //     console.log(key)
    // }

    onClickDeleteBtn = async(uniqueKey) => {
        // this.setState({isLoading : true})
        console.log(uniqueKey)

        

        // const url = `http://localhost:3001/${uniqueKey}`

        const url = `https://postupdatedeletebackend.onrender.com/${uniqueKey}`

        const options =  {
            method : "DELETE",

        }

        await fetch(url,options)


        await this.getPostsData()

        // this.setState({isLoading:false})

        // CHECK THIS WHAT IS HAPPENING WHY TOO MANY LISTS ARE ADDING 

        // this.setState((prevState) => ({
        //     postListForManagingState : prevState.postListForManagingState.filter((eachPost) => uniqueKey !== eachPost.unique_key)
        // }))

        this.setState((prevState) => ({
            postsList : prevState.postsList.filter((eachPost) => uniqueKey !== eachPost.unique_key)
        }))



        
        
    } 

    onClickUpdateBtn = (uniqueKey) => {
        // const {postsList} = this.state

       this.setState(prevState=> ({
            postsList : prevState.postsList.map((eachPost) => {
                const {isUpdateClicked} = eachPost
                if(eachPost.uniqueKey === uniqueKey){
                   return ({...eachPost,isUpdateClicked : ! isUpdateClicked})
                }

                return eachPost
            })
        }))

    }

    onClickSaveBtn = async (uniqueKey) => {

        // CHECK FROM THIS 
        const {updatingPost} = this.state

        if(updatingPost === ""){

            this.setState(prevState=> ({
                postsList : prevState.postsList.map((eachPost) => {
                    const {isUpdateClicked,post} = eachPost
                    if(eachPost.uniqueKey === uniqueKey){
                       return ({...eachPost,post: post,isUpdateClicked : ! isUpdateClicked})
                    }
        
                    return eachPost
                    })
                }))

        }else{

            this.setState(prevState=> ({
                postsList : prevState.postsList.map((eachPost) => {
                    const {isUpdateClicked} = eachPost
                    if(eachPost.uniqueKey === uniqueKey){
                       return ({...eachPost,post : updatingPost,isUpdateClicked : ! isUpdateClicked})
                    }
        
                    return eachPost
                    })
                }))

        }

        // correct this

        // this.setState(prevState=> ({
        //     postsList : prevState.postsList.map((eachPost) => {
        //         const {isUpdateClicked} = eachPost
        //         if(eachPost.uniqueKey === uniqueKey){
        //            return ({...eachPost,post : updatingPost,isUpdateClicked : ! isUpdateClicked})
        //         }
    
        //         return eachPost
        //         })
        //     }))

        
      

        // FETCH UPDATE METHOD

        // const url = "http://localhost:3001/"

        const url = "https://postupdatedeletebackend.onrender.com/"

        const updatePostObject  = {
            uniqueKey,
            post : updatingPost
        } 

        const options  = {
            method : "PUT",
            headers: {
              "Content-Type":  "application/json"
            },
            body :JSON.stringify(updatePostObject)
        }

        const response = await fetch(url,options)

        const data = await response.json()
        console.log(data)

     

    }


    onChangePostElementWhenUpdateBtnClicked = (event) => {

        this.setState({updatingPost : event.target.value})

    }

    



    displayPostsContainer = () => {
        const {postsList} = this.state
        return(
                <ul className="posts-main-container">

                    <button onClick={this.onClickCreateNewPost} className="create-new-post-btn">CREATE NEW POST</button>

                    {postsList.reverse().map((eachPost) => {
                        const {post,uniqueKey,isUpdateClicked} = eachPost
                        return(
                        <li key={uniqueKey} className="post-item-container">
                            {isUpdateClicked?
                                 <textarea defaultValue={post} onChange={this.onChangePostElementWhenUpdateBtnClicked}></textarea> :
                                 <p>{post}</p>}
                            <div>
                                <button className="delete-btn" onClick={() => this.onClickDeleteBtn(uniqueKey)}>DELETE</button>
                                <br/>
                               {isUpdateClicked ?
                               <button className="update-btn" onClick={() => this.onClickSaveBtn(uniqueKey)}>SAVE</button> :
                               <button className="update-btn" onClick={() => this.onClickUpdateBtn(uniqueKey)}>UPDATE</button>
                               }
                            </div>
                        </li>)
                    })}
                    {/* <h1>display posts container</h1> */}
                </ul>  
            )
    }
    


    render(){
        const {creatingPost,isLoading} = this.state

        const pageHeading = creatingPost ? "CREATE A POST" : "YOUR POSTS"

        return (
            <div className="posts-main-container">
                <h1>{pageHeading}</h1>
                {/* check you code from here */}
                {/* {isLoading ? <p>Loading ...</p> : creatingPost ? this.createPostContainer() : this.displayPostsContainer()} */}
                {creatingPost ? this.createPostContainer() : isLoading ? <p>Loading ...</p> : this.displayPostsContainer()}
                {/* {creatingPost ? this.createPostContainer() : this.displayPostsContainer()} */}
                
     
            </div>
        )

    }
}


export default Posts