window.onload = () => {
    const d = new Date();
    document.getElementById("date").innerHTML = d.toLocaleDateString("en-US");
}