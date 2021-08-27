local Tunnel = module("vrp","lib/Tunnel")
local Proxy = module("vrp","lib/Proxy")
local cfg = module("nez_painel","config")
vRP = Proxy.getInterface("vRP")
nez = Tunnel.getInterface("nez_painel")

--##########################################
--##             VARIÁVEIS                ##
--##########################################

local acessando = false
local historico = {}

RegisterCommand(cfg.comando, function(source, args, rawCommand) 
	if nez.checarPermissao() then
		if not acessando then
			StartScreenEffect(cfg.efeito_fundo, 0, true)
			SetNuiFocus(true, true)
			SendNUIMessage({ action = "showMenu" })
			acessando = true
		else
			fecharNUI()
		end
	else
		TriggerEvent("Notify", "negado", "Você não tem permissão para isso.")
	end
end)

--##########################################
--##                 NUI                  ##
--##########################################

RegisterNUICallback("comandoSimples",function(data)
	if nez.checarPermissao() then
		for k,v in pairs(cfg.comandos) do 
			if data.cmd == v then
				ExecuteCommand(v)
				--TriggerEvent("Notify", "sucesso", "Comando '/"..v.. "' executado com sucesso.")
				TriggerEvent('chatMessage',"[ADM]",{255,64,64},"Você executou o comando ^1'/"..v.."'^0.")
			end
		end
	end
end)

RegisterNUICallback("comandoArg",function(data)
	if nez.checarPermissao() then
		for k,v in pairs(cfg.comandos) do 
			if data.cmd == v then
				ExecuteCommand(v .. " " .. data.arg)
				--TriggerEvent("Notify", "sucesso", "Comando '/"..v.. "' executado com sucesso com o argumento '"..data.arg.."'.")
				TriggerEvent('chatMessage',"[ADM]",{255,64,64},"Você executou o comando ^1'/"..v.."' ^0com o argumento ^1'"..data.arg.."'^0.")
				if data.arg ~= "" then
					table.insert(historico, data.arg)
				end
			end
		end
	end
end)

RegisterNUICallback("comandoComplexo",function(data)
	if nez.checarPermissao() then
		for k,v in pairs(cfg.comandos) do 
			if data.cmd == v then
				ExecuteCommand(v .. " " .. data.arg .. " " .. data.arg2)
				--TriggerEvent("Notify", "sucesso", "Comando '/"..v.. "' executado com sucesso com os argumentos '"..data.arg.."' e '"..data.arg2.."'.")
				TriggerEvent('chatMessage',"[ADM]",{255,64,64},"Você executou o comando ^1'/"..v.."' ^0com os argumentos ^1'"..data.arg.."'^0 e ^1'"..data.arg2.."'^0.")
				if data.arg ~= "" then
					table.insert(historico, data.arg)
				end
				if data.arg2 ~= "" then
					table.insert(historico, data.arg2)
				end
			end
		end
	end
end)

RegisterNUICallback("carregarHistorico",function(data,cb)
	if #historico > 0 then
		local tbl = {}
		for k,v in pairs(historico) do
			local i = #historico-k+1
			tbl[i] = historico[k]
		end
		cb({ historico = tbl })
	else
		cb({ historico = {} })
	end
end)

RegisterNUICallback("limparHistorico",function(data,cb)
	if #historico > 0 then
		historico = {}
	end
end)

RegisterNUICallback("fechar",function(data)
	fecharNUI()
end)

--##########################################
--##               FUNÇÕES                ##
--##########################################

function fecharNUI() 
	StopScreenEffect(cfg.efeito_fundo)
	SetNuiFocus(false,false)
	SendNUIMessage({ action = "hideMenu" })
	acessando = false
end
