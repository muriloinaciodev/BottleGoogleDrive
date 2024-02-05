from bottle import run, get, post, static_file, jinja2_view, redirect, request
from os import walk, remove
from secrets import token_hex


@get('/')
@jinja2_view('static/template.html')
def index():
	"""Pagina index. Lista todos os arquivos da pasta storage e oferece as opções de downlaod upload e deletar arquivos"""
	files = list(*walk(r'.\storage'))[-1] #all files names in storage
	return dict(files=files)


@get('/download/<fileName>/<hash>')
def download(fileName, hash):
	"""Faz o download do arquivo <fileName> para o cliente"""
	return static_file(fileName, root=r'.\storage', download=fileName)


@get('/hash/<fileName>')
def hashAntiCache(fileName):
	"""Redireciona para o link de download passando um token aleatorio para evitar o sistema de cache"""
	return redirect(f'/download/{fileName}/{token_hex()}')


@get('/delete/<fileName>')
def delete(fileName):
	"""Deleta o arquivo <fileName> da pasta storage do servidor"""
	remove(f'.\\storage\\{fileName}')
	return redirect('/')


@post('/upload')
def upload():
	"""Recebe um arquivo form e salva-o no storage do servidor"""
	uploadFile = request.files.get('fileInput')
	uploadFile.save(f'.\\storage\\{uploadFile.filename}')
	return redirect('/')
	

@get('/static/<fileName>')
def static(fileName):
	"""Servindo arquivos da pasta static"""
	return static_file(fileName, root='.\\static')


if __name__ == '__main__':
	# http://127.0.0.1:8080/ | http://localhost:8080 | http://192.168.0.196:8080
	run(host='0.0.0.0', port=5050)