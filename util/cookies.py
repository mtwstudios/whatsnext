import base64
import cgi
import Cookie
import email.utils
import hashlib
import hmac
import time
import logging

class CookiesUtil:

    @staticmethod
    def setCookie(response, name, value, domain=None, path="/", expires=None, secret='secret'):
        timestamp = str(int(time.time()))
        value = base64.b64encode(value)
        signature = CookiesUtil.cookieSignature(value, timestamp, secret)
        cookie = Cookie.BaseCookie()
        cookie[name] = "|".join([value, timestamp, signature])
        cookie[name]["path"] = path
        if domain: cookie[name]["domain"] = domain
        if expires:
            cookie[name]["expires"] = email.utils.formatdate(
                expires, localtime=False, usegmt=True)
        response.headers._headers.append(("Set-Cookie", cookie.output()[12:]))


    @staticmethod
    def parseCookie(value, secret='secret'):
        if not value: return None
        parts = value.split("|")
        if len(parts) != 3: return None
        if CookiesUtil.cookieSignature(parts[0], parts[1], secret) != parts[2]:
            logging.warning("Invalid cookie signature %r", value)
            return None
        timestamp = int(parts[1])
        if timestamp < time.time() - 30 * 86400:
            logging.warning("Expired cookie %r", value)
            return None
        try:
            return base64.b64decode(parts[0]).strip()
        except:
            return None


    @staticmethod
    def cookieSignature(part1, part2, secret):
        hash = hmac.new(secret, digestmod=hashlib.sha1)
        hash.update(part1)
        hash.update(part2)
        return hash.hexdigest()
