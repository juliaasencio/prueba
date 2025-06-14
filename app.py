from flask import Flask, render_template, request, redirect, url_for

app = Flask(__name__)

# In-memory storage of shopping list items
shopping_list = []

@app.route('/')
def index():
    return render_template('index.html', items=shopping_list)

@app.route('/add', methods=['POST'])
def add_item():
    item = request.form.get('item')
    if item:
        shopping_list.append(item)
    return redirect(url_for('index'))

@app.route('/delete/<int:item_id>', methods=['POST'])
def delete_item(item_id):
    if 0 <= item_id < len(shopping_list):
        shopping_list.pop(item_id)
    return redirect(url_for('index'))

if __name__ == '__main__':
    app.run(debug=True)
