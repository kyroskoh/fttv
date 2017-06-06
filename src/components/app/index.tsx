import React from "react";
import Helmet from "react-helmet";
import {Route} from "react-router";

import Loadable from "common/loadable";
import Home from "pages/home";
import manifest from "assets/static/manifest.json";
import style from "./style.scss";

export default class App extends React.Component<any, any> {
	render() {
		return (
			<main className={style.container}>
				<Helmet titleTemplate={`%s - ${manifest.short_name}`} />

				<Route exact path="/" component={Home} />
				<Route exact path="/counter" component={Loadable(() => System.import("pages/counter"))} />
			</main>
		);
	}
}
