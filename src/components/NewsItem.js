import React, { Component } from 'react'

export class NewsItem extends Component {
  render() {
    let {tittle,description,imgUrl,newsUrl,aurthor,date} = this.props;
    return (
      <div className='my-3'>
        <div className="card" >
  <img src={!imgUrl?"https://physicsworld.com/wp-content/uploads/2022/06/artist_NSIllustration_CREDIT__NSF_LIGO_Sonoma_State_University_A._Simonnet_resized.jpg":imgUrl} className="card-img-top" alt="..."/>
  <div className="card-body">
    <h5 className="card-title">{tittle}</h5>
    <p className="card-text">{description}</p>
    <p className="card-text"><small className="text-muted">By {!aurthor?"Unknown":aurthor} on {new Date(date).toGMTString()}</small></p>
    <a href={newsUrl} className="btn btn-primary">Read More</a>
  </div>
</div>
    </div>
    )
  }
}

export default NewsItem
