import Modal from 'flarum/components/Modal';
import Button from 'flarum/components/Button';
import fullTime from 'flarum/helpers/fullTime';
export default class ResultsModal extends Modal {
    oninit(vnode) {
        super.oninit(vnode);

        this.message = this.attrs.message;
        this.until = this.attrs.until;
    }

    className() {
        return 'SuspendInfoModal Modal';
    }

    title() {
        return app.translator.trans('flarum-suspend.forum.infomodal.title');
    }

    content() {
        const timespan = this.until.getFullYear() === 2038 
            ? app.translator.trans('flarum-suspend.forum.infomodal.indefinite') 
            : app.translator.trans('flarum-suspend.forum.infomodal.limited', {date: fullTime(this.until)});
        return (
            <div className="Modal-body">
                <div className="Form Form--centered">
                    <p className="helpText">{this.message}</p>
                    <p className="helpText">{timespan}</p>
                    <div className="Form-group">
                        <Button className="Button Button--primary Button--block" onclick={this.hide.bind(this)}>
                            {app.translator.trans('flarum-suspend.forum.infomodal.dismiss_button')}
                        </Button>
                    </div>
                </div>
            </div>
        )
    }
}
