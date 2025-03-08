function PersonComponent(props){
    return(
        <>
            <p id="name">
                Person Name : {props.name}
            </p>
            <p id="age">
                Person Age : {props.age}
            </p>
        </>
    );
}

export default PersonComponent;