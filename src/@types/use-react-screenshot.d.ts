declare module "use-react-screenshot" {
	export function useScreenshot(): [
		string | null,
		(element: HTMLElement) => Promise<string>
	];
}
