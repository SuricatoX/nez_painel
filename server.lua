local Tunnel = module("vrp","lib/Tunnel")
local Proxy = module("vrp","lib/Proxy")
local cfg = module("nez_painel","config")
vRP = Proxy.getInterface("vRP")
nez = {}
Tunnel.bindInterface("nez_painel",nez)

---------------------------------------------------------------------------
-- VARIÁVEIS
---------------------------------------------------------------------------

function nez.checarPermissao()
    local source = source
    local uid = vRP.getUserId(source)
    if uid then
        return vRP.hasPermission(uid, cfg.permissao)
    end
end
