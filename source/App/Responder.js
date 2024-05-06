let FailureHandler = (response, error) => {
	return response.status(error.code || 400).send({
		status: false,
		message: error.message,
	});
};

let successHandler = (response, result) => {
	return response.status(result?.code || 200).send({
		status: true,
		message: result.message,
		data: result.data || undefined,
	});
};

module.exports = (response, result) => {
	if (result?.error) {
		return FailureHandler(response, result?.error);
    }
    return successHandler(response, result);
};
