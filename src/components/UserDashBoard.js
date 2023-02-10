function UserDashBoard() {
    return (  

        <div>
            <img src={localStorage.getItem('profilepic')} className="rounded mx-auto d-block" width={300} height={300} ></img>
        </div>

    );
}

export default UserDashBoard;