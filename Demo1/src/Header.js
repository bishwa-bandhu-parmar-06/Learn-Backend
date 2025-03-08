function Header(props){
    return(
        <>
            <div id="main">
                <div id="#div1">
                    <h2>{props.title}</h2>
                </div>
                <div id="div2">
                    <h4>Home</h4>
                    <h4>About</h4>
                    <h4>Contact</h4>
                    <h4>Course</h4>
                </div>
            </div>
        </>
    );
}

export default Header;