import { jwtVerify, SignJWT } from "jose";

const key = new TextEncoder().encode(process.env.JOSE_SECRET);

export const encrypt = async (payload: any) => {
	return await new SignJWT(payload)
		.setProtectedHeader({ alg: "HS256" })
		.setIssuedAt()
		.setExpirationTime("1 day from now")
		.sign(key);
};

export const decrypt = async (input: string) => {
	const { payload } = await jwtVerify(input, key, { algorithms: ["HS256"] });
	return payload;
};
