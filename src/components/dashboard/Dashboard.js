import React from 'react'

const Dashboard = props => {
    return(
        <div class="card">
            <div class="card-content">
                <div class="media">
                <div class="media-left">
                    <figure class="image is-48x48">
                    <img src="https://bulma.io/images/placeholders/96x96.png" alt="Placeholder image"/>
                    </figure>
                </div>
                <div class="media-content">
                    <p class="title is-4">{props.loggedInUser.name} {props.loggedInUser.lastname}</p>
                    <p class="subtitle is-6">{props.loggedInUser.role}</p>
                </div>
                </div>

                <div class="content">
                <p class="title is-5">{props.loggedInUser.store}</p>
                <p class="subtitle is-6">Email: {props.loggedInUser.username}</p>
                </div>
            </div>
        </div>
    )
}

export default Dashboard;