const urlRegEx = /^(https?:\/\/)?(\w+\.)?(\w+\.)(\w+)([\w\?\&\=\-]?)*(\/[\w\?\&\=\-]*)*$/g;

export const isValidUrl = url => !!url.match(urlRegEx);