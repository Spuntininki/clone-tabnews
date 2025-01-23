function status(request, response) {
	return response.status(200).json({ status: "Tudo certo!" });
}

export default status