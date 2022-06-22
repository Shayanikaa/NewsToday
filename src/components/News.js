import React, { Component } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner';
import PropTypes from 'prop-types'


export class News extends Component {
  static defaultProps = {
    country:'in',
    category:'general'
  }
  
  static propTypes = {
    country: PropTypes.string,
    category:PropTypes.string
  }
  capitalizeFirstLetter=(string)=> {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }
  constructor(props){
    super(props);
    this.state ={
      articles : [],
      loading: false,
      page:1,
    }
    document.title = `NewsToday - ${this.capitalizeFirstLetter(this.props.category)}`;
  }
  async componentDidMount(){
    this.props.setProgress(10);
    let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=104dfa49b82749fbb1901aa15fa8b533&page=1"`
    this.setState({loading: true})
    let data = await fetch(url);
    this.props.setProgress(30);
    let parsedData = await data.json();
    this.props.setProgress(50);
    this.setState({articles: parsedData.articles,
      totalArticles:parsedData.totalResults,
      loading:false
    })
    this.props.setProgress(100);
  }
  handlePrevClick= async ()=>{
    let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=104dfa49b82749fbb1901aa15fa8b533&${this.state.page - 1}`;
    this.setState({loading: true})
    let data = await fetch(url);
    let parsedData = await data.json();
    this.setState({
      page: this.state.page - 1,
      articles: parsedData.articles,
      loading:false
    })

  }
  handleNextClick= async ()=>{
    //if(this.state.page + 1> Math.ceil(this.state.totalResults/10)){

    //}
    //else{
    let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=business&category=${this.props.category}&apiKey=104dfa49b82749fbb1901aa15fa8b533&${this.state.page + 1}`;
    this.setState({loading: true})
    let data = await fetch(url);
    let parsedData = await data.json();
    this.setState({
      page: this.state.page + 1,
      articles: parsedData.articles,
      loading:false
    })
  //}
  }
  
  render() {
    return (
      <div className='text-center' style={{margin: '35px 0px', marginTop:'80px'}}>
        <h2>Top {this.capitalizeFirstLetter(this.props.category)} Headlines</h2>
      {this.state.loading && <Spinner/>}
      
        <div className="row">
          { !this.state.loading && this.state.articles.map((element)=>{
            return <div className="col-md-4" key={element.url}>
            <NewsItem tittle={element.title?element.title.slice(0,85):""} description={element.description?element.description.slice(0,112):""} imgUrl={element.urlToImage} newsUrl={element.url} aurthor={element.author} date={element.publishedAt}/>
            </div>
          })}
        </div>
        <div className="container d-flex justify-content-between">
        <button disabled={this.state.page<=1} type="button" className="btn btn-primary" onClick={this.handlePrevClick}>&larr; Previous</button>
        <button disabled={this.state.page > 2} type="button" className="btn btn-primary" onClick={this.handleNextClick}>Next &rarr;</button>
        </div>
      </div>
    )
  }
}

export default News
