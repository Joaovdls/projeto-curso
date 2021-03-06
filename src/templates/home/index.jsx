import './styles.css';
import { Component } from 'react';
import { loadPosts } from '../../utils/load-post';
import { Posts } from '../../components/Posts';
import { Button } from '../../components/Button';
import { TextInput } from '../../components/TextInput';

export class Home extends Component{
    state = {
      posts: [],
      allPosts: [],
      page: 0,
      postsPerPage: 8,
      searchValue: ''
    };


    componentDidMount(){
      this.loadPosts();
    }

    loadPosts = async () => {
      const { page, postsPerPage } = this.state;
      const postAndPhotos = await loadPosts();
      this.setState({ 
        posts: postAndPhotos.slice(page, postsPerPage), 
        allPosts: postAndPhotos,});
    }  
    
    loadMorePosts = () => {
      const {
        page,
        postsPerPage,
        allPosts,
        posts
      } = this.state;
      const nextPage = page + postsPerPage;
      const nextPosts = allPosts.slice(nextPage, nextPage + postsPerPage);
      posts.push(...nextPosts);


      this.setState({ posts, page: nextPage});
    }

    handleChange = (e) => {
      const {value} = e.target;
      this.setState ({searchValue: value});
    }
  
    render() {
      const { posts, page, postsPerPage, allPosts, searchValue }  = this.state;
      const noMorePosts = page + postsPerPage >= allPosts.length;

      const filteredPosts = !!searchValue ?  
      allPosts.filter(post =>{
        return post.title.toLowerCase().includes(
          searchValue.toLowerCase()
          );
      })
      : posts;
      

      return (
        <section className='container'>
          <div class="search-container">
          {!!searchValue && (
            <h1>Search value: {searchValue}</h1>
          )}

            <TextInput searchValue={searchValue} handleChange={this.handleChange}  />  
          </div>

          {filteredPosts.length > 0 && ( 
          <Posts posts={filteredPosts} />
          )}              

          {filteredPosts.length === 0 && ( 
           <p>Não Existem Posts :c</p> 
          )}              


          <div className="button-container">
            {!searchValue && (
            <Button 
              text="Load More Posts"
              onClick={this.loadMorePosts}
              disabled={noMorePosts}
            />
            )}
          </div>
        </section>      
    );
  }  
}

/* function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}
 */

