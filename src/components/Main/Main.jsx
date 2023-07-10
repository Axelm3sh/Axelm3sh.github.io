// Main.jsx
import React from 'react';
import Article from '../Article/Article.jsx';

function Main() {
    return (
        <main className="container-fluid outer">
            <div id="mainContent" className="container-fluid row">
                <Article id="sectIntro" title="Introductions"/>
                <Article id="sectWork" title="Work Experience"/>
                <Article id="sectProjects" title="Current Projects"/>
                {/* other articles... */}
            </div>
        </main>
    );
}
export default Main;