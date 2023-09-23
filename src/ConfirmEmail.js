export default async function ConfirmEmail() {
    let htmlCode = '';
    await fetch('confirmEmail.html')
        .then(response => response.text())
        .then(html => htmlCode = html)
        .catch(console.error);

    return htmlCode;
}