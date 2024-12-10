document.getElementById("cadastroForm").addEventListener("submit", async function(e) {
    e.preventDefault(); // Evita o envio padrão do formulário

    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    const userData = { name, email, password };

    try {
        const response = await fetch("/user/register", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(userData)
        });

        if (response.ok) {
            alert("Cadastro realizado com sucesso!");
            document.getElementById("cadastroForm").reset(); // Limpa o formulário
        } else {
            const errorText = await response.text();
            alert(`Erro ao cadastrar: ${errorText}`);
        }
    } catch (error) {
        alert("Erro de conexão com o servidor.");
        console.error("Erro ao enviar os dados:", error);
    }
});
