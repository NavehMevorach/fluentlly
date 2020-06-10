import React from 'react'

const Article = ({ data: { title, paragraphs } }) => {
   return (
      <article className='article'>
         <h2>{title}</h2>
         {paragraphs && paragraphs.map((paragraph, index) => (
            <div key={index}>
               <p>{paragraph}</p><br/>
            </div>
         ))}
      </article>
   )
}

export default Article