const getRandomInt = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

const onload = (callback) => {
    document.addEventListener('DOMContentLoaded', callback)
}

window.find = (query) => {
    return Array.from(document.querySelectorAll('.language-css'))
}

class Test {
    constructor (configuration) {
        this._run = configuration.run
        this.running = false;
        const node = this._node = create('div', {
            class: 'test',
            click: (event) => {
                this.run();
            }
        })
        node.appendChild(create('h2', {
            text: configuration.name,
            class: 'test-title'
        }))
        this.html = create('html', {
            class: 'test-html',
            html: configuration.html
        })
        node.appendChild(this.html)
    }
    run() {
        if (!this.running) {
            this.node.classList.add('is__loaded')
            this.running = true;
            this._run(this);
        }
        
    }
    get(query) {
        return this.html.querySelector(query)
    }
    // get testNode() {
    //     return this._node
    // }
    get node() {
        return this._node
    }
}

window.ursi = (configuration) => {
    document.addEventListener('DOMContentLoaded', () => {
        document.body.classList.add('theme-'+configuration.theme)
        loadScripts(configuration.scripts, () => {
            const html = configuration.html;
            for (let i = 0; i < configuration.tests.length; i++) {
                const test = new Test({
                    name: configuration.tests[i].name,
                    html: html,
                    run: configuration.tests[i].run
                })
                if (configuration.tests[i].autorun) {
                    test.run()
                }
                document.body.appendChild(test.node)
            }
        })
    })
}

const loadScripts = (scripts, callback) => {
    let count = scripts.length;
    // console.log(count)
    const loadScript = (url) => {
        const node = create('script', {
            attributes: {
                src: url
            },
            events: {
                load: () => {
                    --count
                    if (count === 0) {
                        callback();
                    }
                }
            }
        });
        document.head.appendChild(node);
    }
    for (const script of scripts) {
        loadScript(script);
    }
};

const create = (type, config) => {
    const node = document.createElement(type);
    for (const key in config) {
        const value = config[key];
        switch (key) {
            case 'text':
                node.innerText = value
                break;
            case 'class':
                node.className = value
                break;
            case 'html':
                node.innerHTML = value
                break;
            case 'click':
                node.onclick = value
            case 'attributes':
                for (const key in value) {
                    node.setAttribute(key, value[key]);
                }
                break;
            case 'events':
                for (const key in value) {
                    node.addEventListener(key, value[key]);
                }
                break;
        }
    }
    return node;
}