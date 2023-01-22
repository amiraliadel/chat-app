export default async (req, res) => {
    return res
    .status(200)
    .clearCookie('jwtToken', {httpOnly: true, secure: true, sameSite: 'None'})
    .json({server_message: 'you are successfully logged out.', success: true});
}