import React from 'react'

import Header from "../../components/header/header";
import ItemsNav from "../../components/itemsNav/itemsNav";
import Footer from "../../components/footer/footer";


import "./postRequest.css"

function postRequest() {
    return (
        <>
            <Header />
            <ItemsNav />
            <div className="postRequestContainer">
                <div className="postRequestTitle">
                    What service will you like to find ?
                </div>
                <form className='postRequestForm'>
                    <div className='postRequestDescription'>
                        <div className="postRequestDescriptionTitle">
                            Give a small description of what you will like!
                        </div>
                        <div className="postRequestDescriptionNumberCharacters">
                            0/2000
                        </div>
                        <textarea name="postRequestDescription" className="postRequestDescriptionTextArea" rows="5" placeholder='I need...'>

                        </textarea>
                    </div>
                    <div className="postRequestCategorie">
                        <div className="postRequestCategorieTitle">
                            Category:
                        </div>
                        <div className="selects">
                            <spam className="categoriSelect">
                                <label htmlFor="postRequestCategorieCategorie">Choose a category</label>
                                <select name="categori" className="postRequestCategorieCategorie">
                                    <option value="Computing">Computing</option>
                                    <option value="Computing">Computing</option>
                                    <option value="Computing">Computing</option>
                                </select>
                            </spam>
                            <spam className="categoriSelect">
                                <label htmlFor="postRequestCategorieSubCategorie">Choose a subcategory</label>
                                <select name="categori" className="postRequestCategorieSubCategorie">
                                    <option value="Computing">Computing</option>
                                    <option value="Computing">Computing</option>
                                    <option value="Computing">Computing</option>
                                </select>
                            </spam>
                        </div>
                    </div>
                    <div className="postRequestCategorieDays">
                        <div className="postRequestCategorieDaysTitle">
                            for what numbers of days you want your work done:
                        </div>
                        <label htmlFor="Days">Days </label>
                        <input type="text" className='postRequestCategorieDaysInput' />
                    </div>
                    <div className="postRequestCategorieBudget">
                        <div className="postRequestCategorieBudgetTitle">
                            what your budget:
                        </div>
                        <label htmlFor="postRequestCategorieBudget">$ </label>
                        <input type="text"className="postRequestCategorieBudgetInput" />
                    </div>
                    <div className="postRequestCategorieSubmit">
                        <button type="submit">Post request</button>
                    </div>
                </form>
            </div>

            <Footer />
        </>
    )
}

export default postRequest
