type Config = {
  tronContractAddress: string;
  tronTokenAddress: string;
};

export const config: Config = {
  tronContractAddress:
    process.env.NEXT_PUBLIC_TRON_CONTRACT_ADDRESS ??
    // TNQydHmixXv68XWBeUaQ2yfvyC1Da2DAiG - v1
    // TTpLqydgSFA5Rq4SC65z4qErA2kX4kAVYg - v2
    'TFzifQaUh5xi3JVtC9w8kCWvh9HiNebj5z', // - v3
  tronTokenAddress:
    process.env.NEXT_PUBLIC_TRON_TOKEN_ADDRESS ??
    'TAeM387351bgxjsGgXmWFZyAz84bLYh4SP',
};
