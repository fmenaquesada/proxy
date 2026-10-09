function FindProxyForURL(url, host) { 
    /* Normalize the URL for pattern matching */
    url = url.toLowerCase();
    host = host.toLowerCase();
    
    /* Don't proxy local hostnames */
    if (isPlainHostName(host)) {
        return 'DIRECT';
    }
    
    /* Bypass specific Okta and OktaCDN domains */
    if (dnsDomainIs(host, "integrator-1263147.okta.com") || 
        dnsDomainIs(host, "ok14static.oktacdn.com")) {
        return 'DIRECT';
    }
    
    /* Route HTTP and HTTPS traffic through the proxy */
    if (url.substring(0, 5) === 'http:' || url.substring(0, 6) === 'https:') {
        return 'PROXY eproxy-fmena.goskope.com:8081';
    }
    
    /* Default rule for everything else */
    return 'DIRECT';
}
